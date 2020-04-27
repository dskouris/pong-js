class Paddle {
  constructor(y, thickness, height) {
    this.y = y;
    this.thickness = thickness;
    this.height = height;
    this.score = 0;
    this.moveUp = () => {
      this.y -= 15;
    };
    this.moveDown = () => {
      this.y += 15;
    };
  }
}

class Ball {
  constructor(size) {
    this.size = size;
    this.x = this.y = 50;
    this.xVel = this.yVel = 1;
    this.collisionCount = 0;
  }
}

window.onload = () => {
  (canvas = document.getElementById('canvas')), (ctx = canvas.getContext('2d'));
  player1 = new Paddle(40, 10, 50);
  player2 = new Paddle(40, 10, 50);
  ball = new Ball(6);
  setInterval(update, 10);
  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'w':
        player1.moveUp();
        break;
      case 's':
        player1.moveDown();
        break;
      case 'ArrowUp':
        player2.moveUp();
        break;
      case 'ArrowDown':
        player2.moveDown();
        break;
    }
  });
};

resetBall = () => {
  ball.collisionCount = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVel = -ball.xVel;
  if (ball.xVel > 0) {
    ball.xVel = 1;
  } else {
    ball.xVel = -1;
  }
};

update = () => {
  ball.x += ball.xVel;
  ball.y += ball.yVel;

  if (ball.y >= canvas.height && ball.yVel === 1) {
    ball.yVel = -1;
  }
  if ((ball.y <= 0) & (ball.yVel === -1)) {
    ball.yVel = 1;
  }
  if (ball.x > canvas.width - player2.thickness) {
    if (ball.y >= player2.y && ball.y <= player2.y + player2.height) {
      ball.xVel = -ball.xVel;
      ball.collisionCount++;
      if (ball.collisionCount >= 5) {
        ball.xVel--;
      }
    } else {
      player1.score++;
      resetBall();
    }
  }
  if (ball.x < player1.thickness) {
    if (ball.y >= player1.y && ball.y <= player1.y + player1.height) {
      ball.xVel = -ball.xVel;
      ball.collisionCount++;
      if (ball.collisionCount >= 5) {
        ball.xVel++;
      }
    } else {
      player2.score++;
      resetBall();
    }
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(1, player1.y, player1.thickness, player1.height);
  ctx.fillRect(
    canvas.width - player2.thickness - 1,
    player2.y,
    player2.thickness,
    player2.height
  );
  ctx.font = 'arial-black';
  ctx.fillText(player1.score, 50, 20);
  ctx.fillText(player2.score, canvas.width - 50, 20);
  ctx.fillRect(
    ball.x - ball.size / 2,
    ball.y - ball.size / 2,
    ball.size,
    ball.size
  );
};
