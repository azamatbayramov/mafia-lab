import { useState } from 'react';
import situations from '../data/scenarios/relationships.json';
import './mafia-table.css';

const players = Array.from({ length: 10 }, (_, index) => index + 1);
type Claim = (typeof situations)[number]['claims'][number];

function playerPosition(player: number, radius: number) {
  const angle = ((player - 1) * 2 * Math.PI) / players.length;
  return {
    x: 210 + radius * Math.sin(angle),
    y: 210 - radius * Math.cos(angle),
  };
}

function relationshipLabel(claim: Claim) {
  return claim.kind === 'support' ? 'Поддержка' : 'Возражение';
}

export default function MafiaTable() {
  const [activeStage, setActiveStage] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(6);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const situation = situations[activeStage];
  const relatedClaims = situation.claims.filter(
    (claim) => claim.from === selectedPlayer || claim.to === selectedPlayer,
  );

  function selectStage(index: number) {
    setActiveStage(index);
    setShowAnalysis(false);
  }

  return (
    <section className="mafia-table" aria-label="Интерактивная схема связей игроков">
      <div className="mafia-table__top">
        <div>
          <p className="mafia-table__eyebrow">ИНТЕРАКТИВНЫЙ РАЗБОР · 10 ИГРОКОВ</p>
          <h3 className="mafia-table__heading">Кто с кем играет?</h3>
          <p className="mafia-table__subtitle">
            Нажимай на номера игроков и изучай подтверждённые наблюдения.
          </p>
        </div>
        <span className="mafia-table__counter">0{activeStage + 1} / 0{situations.length}</span>
      </div>

      <div className="mafia-table__steps" role="group" aria-label="Этап ситуации">
        {situations.map((stage, index) => (
          <button
            className={index === activeStage ? 'mafia-table__step is-active' : 'mafia-table__step'}
            type="button"
            key={stage.id}
            aria-pressed={index === activeStage}
            onClick={() => selectStage(index)}
          >
            {stage.title}
          </button>
        ))}
      </div>

      <p className="mafia-table__context">{situation.description}</p>

      <div className="mafia-table__workspace">
        <div className="mafia-table__board-wrapper">
          <div className="mafia-table__board" aria-label="Игровой стол">
            <svg className="mafia-table__connections" viewBox="0 0 420 420" aria-hidden="true">
              <circle cx="210" cy="210" r="143" className="mafia-table__felt" />
              <circle cx="210" cy="210" r="145" className="mafia-table__felt-outline" />
              {situation.claims.map((claim) => {
                const from = playerPosition(claim.from, 171);
                const to = playerPosition(claim.to, 171);
                const highlighted = claim.from === selectedPlayer || claim.to === selectedPlayer;
                return (
                  <line
                    key={claim.id}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={[
                      'mafia-table__edge',
                      claim.kind === 'support' ? 'is-support' : 'is-challenge',
                      highlighted ? 'is-highlighted' : '',
                    ].join(' ')}
                  />
                );
              })}
            </svg>
            <div className="mafia-table__board-center" aria-hidden="true">
              <span className="mafia-table__center-diamond">◇</span>
              <strong>MAFIA</strong>
              <span>LAB</span>
            </div>
            {players.map((player) => {
              const position = playerPosition(player, 171);
              const selected = player === selectedPlayer;
              return (
                <button
                  type="button"
                  key={player}
                  className={selected ? 'mafia-table__seat is-selected' : 'mafia-table__seat'}
                  style={{ left: `${(position.x / 420) * 100}%`, top: `${(position.y / 420) * 100}%` }}
                  onClick={() => setSelectedPlayer(player)}
                  aria-label={`Игрок номер ${player}`}
                  aria-pressed={selected}
                >
                  {player}
                </button>
              );
            })}
          </div>

          <div className="mafia-table__legend" aria-label="Условные обозначения">
            <span><i className="mafia-table__legend-line is-support" />Поддержка</span>
            <span><i className="mafia-table__legend-line is-challenge" />Возражение</span>
          </div>
        </div>

        <aside className="mafia-table__details" aria-live="polite" aria-atomic="true">
          <span className="mafia-table__details-label">В ФОКУСЕ</span>
          <h4>Игрок №{selectedPlayer}</h4>
          <p className="mafia-table__details-hint">
            {relatedClaims.length === 0
              ? 'Для этого игрока в выбранном этапе нет наблюдаемых связей.'
              : `Наблюдений с участием игрока: ${relatedClaims.length}`}
          </p>
          {relatedClaims.length > 0 && (
            <ul className="mafia-table__evidence">
              {relatedClaims.map((claim) => (
                <li key={claim.id}>
                  <div className="mafia-table__evidence-top">
                    <span className={claim.kind === 'support' ? 'mafia-table__tag is-support' : 'mafia-table__tag is-challenge'}>
                      {relationshipLabel(claim)}
                    </span>
                    <span className="mafia-table__pair">№{claim.from} → №{claim.to}</span>
                  </div>
                  <p>{claim.evidence}</p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <div className="mafia-table__bottom">
        <div>
          <strong>А что можно заключить?</strong>
          <p>Связь показывает действие, а не скрытую роль игрока.</p>
        </div>
        <button
          type="button"
          className="mafia-table__analysis-button"
          onClick={() => setShowAnalysis((previous) => !previous)}
          aria-expanded={showAnalysis}
        >
          {showAnalysis ? 'Скрыть разбор' : 'Показать разбор'}
        </button>
      </div>
      {showAnalysis && (
        <div className="mafia-table__analysis" role="note">
          {activeStage === 0 ? (
            <p>
              №2 поддержал №6, а №4 возразил №6. Это две проверяемые реплики,
              но они ещё не доказывают ни цвета игроков, ни устойчивой командной связи.
              Сформулируй вопрос: почему №4 не согласился с №6?
            </p>
          ) : (
            <p>
              №2 сначала поддержал №6, затем согласился с возражением №4 против №6.
              Это повод уточнить аргументацию №2. Возможна смена мнения, ошибка
              в логике или тактический манёвр — имеющихся наблюдений недостаточно,
              чтобы однозначно выбрать объяснение.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
