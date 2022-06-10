MLib.debug = true;

const app = new PIXI.Application()
document.getElementById('container').appendChild(app.view);

const sprite = PIXI.Sprite.from('../images/1.png');


sprite.width = 1920;
sprite.height = 1080;

app.stage.addChild(sprite);


const scale = new MLib.Scale(
    document.getElementById('container'),
    app.view,
    {
        width: 1920,
        height: 1080
    });

scale.addResizeListener((e) => {
    app.renderer.resize(e.width, e.height);
    console.log(e);
})

scale.addResizeListener((e) => {
    const coords = scale.transformCoords({ x: 0, y: 0 });
    const size = scale.transformSize({ width: 1920, height: 1080 });


    sprite.width = size.width;
    sprite.height = size.height;
    sprite.x = coords.x;
    sprite.y = coords.y;
})