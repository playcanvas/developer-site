---
title: Реальное время многопользовательской игры с Colyseus
layout: tutorial-page.hbs
tags: многопользовательский, сетевой
thumb: https://avatars.githubusercontent.com/u/28384334?s=300&v=4
---

<iframe loading="lazy" src="https://playcanv.as/p/1QoAsx7r/" title="Real-time Multiplayer with Colyseus"></iframe>

> *Выберите создание игры, чтобы открыть новую игру. И щелкните в любом месте пола, чтобы переместить объект.*

## В этом уроке вы узнаете:
- Настройка вашего сервера Colyseus
- Синхронизация состояния между сервером и клиентом
- Обмен сообщениями между клиентом и сервером
- Матчмейкинг: как создавать, присоединяться и просматривать доступные игры

## Материалы

- [Проект PlayCanvas (со стороны клиента)](https://playcanvas.com/project/859259/overview/colyseus-demo)
- [Проект Colyseus TypeScript (со стороны сервера)](https://github.com/colyseus/tutorial-playcanvas-server)

# Прежде чем начать

## Ожидаемые предварительные знания

- Базовые знания PlayCanvas ([См. Ресурсы для разработчиков PlayCanvas](https://developer.playcanvas.com/))
- Базовое понимание JavaScript/TypeScript ([См. Руководство по TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html))
- Базовое понимание Node.js ([См. Введение в Node.js](https://nodejs.dev/en/learn/))

## Требования к программному обеспечению

- [Node.js LTS](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)

# Создание сервера

Мы создадим базовый сервер, размещенный локально на вашем компьютере для хранения состояний игроков. Изменения будут синхронизироваться с клиентами соответствующим образом.

Чтобы создать новый сервер Colyseus, выполните следующие действия в командной строке:

```
npm init colyseus-app ./playcanvas-demo-server
```

Давайте убедимся, что вы можете запустить сервер локально, выполнив команду `npm start`:

```
cd playcanvas-demo-server
npm start
```

Если все выполнено успешно, результат должен выглядеть так в вашей командной строке:

```
Issue Tracker
Tutorial Thumbnail
Entity
Material Asset
Material Inspector
Shader Editor
Node Inspector
Texture Inspector
Graph Inspector
Asset
Graph Editor
Assets
```

```
> my-app@1.0.0 start
> ts-node-dev --respawn --transpile-only src/index.ts

✅ development.env загружен.
✅ Express инициализирован
🏟 Ваше Colyseus приложение
⚔️ Слушает на ws://localhost:2567
```

# Включение Colyseus JavaScript SDK

Теперь нам нужно добавить Colyseus JavaScript SDK в PlayCanvas.

Мы можем сделать это через "внешний скрипт" в настройках проекта PlayCanvas.

Откройте **"Меню" → "Настройки"**:

![settings](/images/tutorials/multiplayer-colyseus/settings.png)

В панели настроек разверните **"Внешние скрипты"** и увеличьте количество **"URL-адресов"**.

![CDN](/images/tutorials/multiplayer-colyseus/ext_script.png)

В новом поле **"URL"** давайте включим Colyseus JavaScript SDK с CDN:

```
https://unpkg.com/colyseus.js@^0.15.0-preview.2/dist/colyseus.js
```

Это сделает [JavaScript SDK](https://docs.colyseus.io/colyseus/getting-started/javascript-client/) `Colyseus` доступным для наших сценариев PlayCanvas.

# Установление соединения между клиентом и сервером

Теперь, из нового сценария PlayCanvas, давайте создадим экземпляр `Colyseus.Client`. ([см. "Создание новых сценариев"](https://developer.playcanvas.com/en/user-manual/scripting/creating-new/))

Вы можете прикрепить этот сценарий к новой пустой сущности под названием "NetworkManager".

```javascript
var NetworkManager = pc.createScript('networkManager');

NetworkManager.prototype.initialize = function () {
  //
  // создание экземпляра SDK
  // (на этом этапе соединение не устанавливается)
  //
  this.app.colyseus = new Colyseus.Client("ws://localhost:2567");

  //
  // запрос на присоединение или создание комнаты "my_room"
  // (установление соединения с сервером)
  //
  this.room = await this.app.colyseus.joinOrCreate("my_room");
}
```

> Обратите внимание, что здесь мы используем локальную конечную точку `ws://localhost:2567`. Вам нужно [развернуть свой сервер](https://docs.colyseus.io/arena/getting-started/create-application/) в публичном интернете, чтобы играть с другими пользователями онлайн. Вы также можете использовать [Glitch](https://glitch.com/edit/#!/tutorial-playcanvas-server) для публичного размещения вашего сервера.

Когда вы теперь **"Запустите"** свой проект PlayCanvas, ваш клиент установит соединение с сервером, и сервер создаст комнату `my_room` по запросу для вас.

Обратите внимание, что `my_room` является идентификатором комнаты по умолчанию, установленным сервером Colyseus. Вы можете и должны изменить этот идентификатор в файле `arena.config.ts`.

Вы увидите следующее сообщение в журналах вашего сервера, что означает успешное присоединение клиента к комнате!

```
19U8WkmoK присоединился!
```

# Состояние комнаты и схема

В Colyseus мы определяем общие данные через структуры `Schema`.

> `Schema` - это особый тип данных от Colyseus, который способен кодировать свои изменения/мутации _инкрементно_. Процесс кодирования и декодирования происходит внутри фреймворка и его SDK.

Цикл синхронизации состояния выглядит следующим образом:

1. Изменения состояния (мутации) синхронизируются автоматически от сервера → клиенты
2. Клиенты, присоединяя обратные вызовы к своим локальным _только для чтения_ структурам `Schema`, могут наблюдать за мутациями состояния и реагировать на них.
3. Клиенты могут отправлять произвольные сообщения на сервер - который решает, что делать с ними - и могут изменять состояние (Вернуться к шагу **1.**)

---

Давайте вернемся к редактированию кода сервера и определим состояние комнаты на сервере.

Нам нужно обрабатывать несколько экземпляров `Player`, и каждый `Player` будет иметь координаты `x`, `y` и `z`:

```typescript
// MyRoomState.ts
import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("number") x: number;
    @type("number") y: number;
    @type("number") z: number;
}

export class MyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}
```

> Узнайте больше о [структурах схемы](https://docs.colyseus.io/colyseus/state/schema/).

Теперь, продолжая на стороне сервера, давайте изменим наш метод `onJoin()` для создания экземпляра `Player` при установлении нового соединения с комнатой.

```typescript
// MyRoom.ts
// ...
    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "присоединился!");

        // создать экземпляр Player
        const player = new Player();

        // разместить Player в случайной позиции
        const FLOOR_SIZE = 4;
        player.x = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);
        player.y = 1.031;
        player.z = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);

        // разместить игрока на карте игроков по его sessionId
        // (client.sessionId уникален для каждого соединения!)
        this.state.players.set(client.sessionId, player);
    }
// ...
}
```

Также, когда клиент отключается, давайте удалим игрока из карты игроков:

```typescript
// MyRoom.ts
// ...
    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "покинул!");

        this.state.players.delete(client.sessionId);
    }
// ...
```

Мутации состояния, которые мы сделали на стороне сервера, **можно наблюдать** на стороне клиента, и это то, что мы собираемся сделать в следующем разделе.

# Настройка сцены для синхронизации

Для этой демонстрации нам нужно создать два объекта на нашей сцене:

- Плоскость для представления пола
- Капсула для представления игроков, которую мы будем клонировать для каждого нового игрока, присоединяющегося к комнате.

## Создание плоскости

Давайте создадим плоскость с масштабом `8`.

![Плоскость](/images/tutorials/multiplayer-colyseus/plane.jpg)

## Создание игрока

Давайте создадим капсулу игрока с масштабом `1`.

Не забудьте снять флажок с свойства `"Enabled"`. У нас не будет включенных экземпляров игрока, пока у нас не будет активных соединений с сервером.

![Игрок](/images/tutorials/multiplayer-colyseus/player.png)

# Прослушивание изменений состояния

После установления соединения с комнатой клиентская сторона может начать прослушивание изменений состояния и создавать визуальное представление данных на сервере.

## Добавление новых игроков

Как указано в разделе [Состояние комнаты и схема](#room-state-and-schema), когда сервер принимает новое соединение - метод `onJoin()` создает новый экземпляр игрока в состоянии.

Теперь мы собираемся прослушать это событие на стороне клиента:

```typescript
// ...
this.room.state.players.onAdd((player, sessionId) => {
  //
  // Игрок присоединился!
  //
  console.log("Игрок присоединился! Их уникальный идентификатор сеанса", sessionId);
});
// ...
```

При воспроизведении сцены вы должны увидеть сообщение в консоли браузера при подключении нового клиента к комнате.

Для визуального представления нам нужно клонировать объект "Player" и сохранить локальную ссылку на клонированный объект на основе их `sessionId`, чтобы мы могли работать с ними позже:

```typescript
// ...

// здесь мы назначим каждому игроку визуальное представление
// по их `sessionId`
this.playerEntities = {};

// слушаем новых игроков
this.room.state.players.onAdd((player, sessionId) => {
  // находим базовое представление игрока (не активировано)
  const playerEntityToClone = this.app.root.findByName("Player");

  // клонируем представление игрока и активируем его!
  const entity = playerEntityToClone.clone();
  entity.enabled = true;

  // устанавливаем позицию на основе данных сервера
  entity.setPosition(player.x, player.y, player.z);

  // добавляем клон в сцену
  playerEntityToClone.parent.addChild(entity);

  // назначаем визуальное представление по их `sessionId`
  this.playerEntities[sessionId] = entity;
});
// ...
```

## "Текущий игрок"

Вы можете сохранить специальную ссылку на объект текущего игрока, проверив `sessionId` на соответствие подключенному `room.sessionId`:

```typescript
// ...
this.room.state.players.onAdd((player, sessionId) => {
  // ...
  if (room.sessionId === sessionId) {
    this.currentPlayerEntity = playerEntities[sessionId];
  }
  // ...
});
```

## Удаление отключенных игроков

Когда игрок удаляется из состояния (после `onLeave()` на стороне сервера), нам нужно также удалить их визуальное представление.

```javascript
// ...
this.room.state.players.onRemove((player, sessionId) => {
  // уничтожить сущность
  this.playerEntities[sessionId].destroy();

  // очистить локальную ссылку
  delete this.playerEntities[sessionId];
});
// ...
```

# Перемещение игроков

## Отправка новой позиции на сервер

Мы собираемся разрешить событие "mouse down"; используйте [ray cast](https://developer.playcanvas.com/en/user-manual/physics/ray-casting/) для определения точной позиции `Vec3`, к которой должен двигаться игрок, а затем отправьте ее в виде сообщения на сервер.

```typescript
// ...
this.app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
  // Создаем "ограничивающую рамку" для пола
  const boundingBox = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(4, 0.001, 4));;

  // Инициализируем луч и определяем направление луча
  // из положения на экране
  const ray = new pc.Ray();
  const targetPosition = new pc.Vec3();

  const cameraEntity = this.app.root.findByName("Camera");
  cameraEntity.camera.screenToWorld(event.x, event.y, cameraEntity.camera.farClip, ray.direction);
  ray.origin.copy(cameraEntity.getPosition());
  ray.direction.sub(ray.origin).normalize();

  // Проверяем луч на пересечение с землей
  const result = boundingBox.intersectsRay(ray, targetPosition);

  if (result) {
    // Корректируем высоту позиции
    targetPosition.y = 1.031;

    //
    // Отправляем новую целевую позицию игрока на сервер.
    //
    this.room.send("updatePosition", {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
    });
  }
});
```

## Получение сообщения от сервера

Каждый раз, когда сообщение `"updatePosition"` получено на сервере, мы будем изменять игрока, отправившего сообщение, через его `sessionId`.

```typescript
// MyRoom.ts
// ...
  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("updatePosition", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });
  }
// ...
```

```typescript
// MyRoom.ts
// ...
  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("обновитьПозицию", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });
  }
// ...
```

## Обновление визуального представления игрока

Имея мутацию на сервере, мы можем обнаружить ее на стороне клиента через `player.onChange()` или `player.listen()`.

- `player.onChange()` срабатывает **для каждого экземпляра схемы**
- `player.listen(prop)` срабатывает **при изменении каждого свойства**

Мы собираемся использовать `.onChange()`, так как нам нужны все новые координаты сразу, независимо от того, изменилась ли только одна из них.

```typescript
// ...
this.room.state.players.onAdd((player, sessionId) => {
  // ...
  player.onChange(() => {
    this.playerEntities[sessionId].setPosition(player.x, player.y, player.z);
  });

  // Альтернатива, прослушивание отдельных свойств:
  // player.listen("x", (newX, prevX) => console.log(newX, prevX));
  // player.listen("y", (newY, prevY) => console.log(newY, prevY));
  // player.listen("z", (newZ, prevZ) => console.log(newZ, prevZ));
});
```

> Читайте [больше о схемах обратных вызовов](https://docs.colyseus.io/colyseus/state/schema/#client-side)

# Дополнительно: Мониторинг комнат и соединений

Colyseus поставляется с дополнительной панелью мониторинга, которая может быть полезной во время разработки вашей игры.

Чтобы просмотреть панель монитора на вашем локальном сервере, перейдите по адресу `http://localhost:2567/colyseus`.

![monitor](/images/tutorials/multiplayer-colyseus/monitor.png)

Вы можете видеть и взаимодействовать со всеми созданными комнатами и активными клиентскими соединениями через эту панель.

> Смотрите [больше информации о панели монитора](https://docs.colyseus.io/colyseus/tools/monitor/).


# Больше

Мы надеемся, что этот учебник был полезным для вас, если вы хотите узнать больше о Colyseus, ознакомьтесь с [документацией Colyseus](https://docs.colyseus.io/) и присоединитесь к [сообществу Colyseus в Discord](https://discord.gg/RY8rRS7).
