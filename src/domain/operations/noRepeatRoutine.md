# Рутина без повтора

День планирования - `startMoment`

## Отображение невыполненного таска

* Без перепланирования на следующий день

Отображается только в день планирования.

* С перепланированием на следующий день

Если `startMoment < today`, отображается в `today`.

## Ручной перенос

При ручном переносе таска изменяется ее `startMoment`