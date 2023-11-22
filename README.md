### Hexlet tests and linter status:

 [![Node.js CI](https://github.com/Jenmaru/frontend-project-46/actions/workflows/github-actions-demo.yml/badge.svg?branch=master&event=push)](https://github.com/Jenmaru/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/7fd248435b89416ac7fc/maintainability)](https://codeclimate.com/github/Jenmaru/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/7fd248435b89416ac7fc/test_coverage)](https://codeclimate.com/github/Jenmaru/frontend-project-46/test_coverage)

# Вычислитель отличий / Generate Difference

## Описание
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

### Возможности утилиты:
  - Поддержка разных входных форматов: yaml, json
  - Генерация отчета в виде plain text, stylish и json

## Цель:

- ### Структуры данных и Алгоритмы
    - Научиться описывать внутреннее представление различий между файлами так, чтобы оно было максимально удобно;
    - Работа с деревьями и древовидной рекурсией;  

- ### Архитектура
    - Научиться выполнять такие операции как: чтение файлов, парсинг входящих данных, построение дерева различий, формирование необходимого вывода;
    - Новый уровень модульности и абстракций;
    - Работа с параметрами командной строки (более глубокое понимание работы ОС и командных интерпретаторов в частности)

- ### Тестирование и Отладка
    - Научиться писать автоматизированные тесты;
    - Для написания тестов используется фреймворк Jest;

## Setup

```sh
$ make install
```

## Пример использования
Поиск различий между двумя плоскими json-файлами
[![asciicast](https://asciinema.org/a/7XQSzzodsTxzwMsewztIE3iLr.svg)](https://asciinema.org/a/7XQSzzodsTxzwMsewztIE3iLr)

Поиск различий между двумя файлами с древовидной структурой.
[![asciicast](https://asciinema.org/a/78pthe8irVnMy3wCScGSvbdsz.svg)](https://asciinema.org/a/78pthe8irVnMy3wCScGSvbdsz)

Генерация отчет Plain text  

[![asciicast](https://asciinema.org/a/qf0XcTfbX8BOWbdNLHVBIzRMB.svg)]( https://asciinema.org/a/qf0XcTfbX8BOWbdNLHVBIzRMB)

Генерация отчета json

[![asciicast](https://asciinema.org/a/LegHcyOoqB2NqLiVFXJpbVQvk.svg)]( https://asciinema.org/a/LegHcyOoqB2NqLiVFXJpbVQvk)