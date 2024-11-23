export default {
  name: "Player",
  components: [
    {
      type: "PositionComponent",
      data: {
        x: 100,
        y: 150,
      },
    },
    {
      type: "ColliderComponent",
      data: {
        w: 32,
        h: 32,
      },
    },
    {
      type: "VelocityComponent",
      data: {
        vx: 120,
        vy: 120,
      },
    },
    {
      type: "HealthComponent",
      data: {
        current: 100,
        max: 100,
      },
    },
    {
      type: "SpriteComponent",
      data: {
        src: "/characters/char_1.png",
      },
    },
    {
      type: "TagComponent",
      data: {
        tag: "player",
      },
    },
  ],
};
