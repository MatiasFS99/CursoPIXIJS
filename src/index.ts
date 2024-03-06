import { Application, Assets, AssetsManifest, Container, Sprite } from 'pixi.js'





const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

window.addEventListener("resize", ()=>{
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX,scaleY);
	
	const gameWidth = Math.floor(app.screen.width * scale);
	const gameHeight = Math.floor(app.screen.height * scale);

	const marginHorizonal = Math.floor((window.innerWidth - gameWidth)/2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight)/2);

	app.view.style.width = gameWidth+"px";
	app.view.style.height = gameHeight+"px";
	app.view.style.marginLeft = marginHorizonal+"px";
	app.view.style.marginTop = marginVertical+"px";

});

async function init() {
	const manifest:AssetsManifest  = {
		bundles: [
			{
				name : "Sprites",
				assets:
				{
					"Clampy" : "./clampy.png",
					"ConitoCrab" : "./CCrab.png",
				}
			},
		]
	}
    // Assets.init must only happen once! 
    // Pack all your bundles into one manifest!
    await Assets.init({ manifest: manifest });
	window.dispatchEvent(new Event('resize'));
    DrawScreen(); 
}

init();

async function DrawScreen(){
	const Sprites = await Assets.loadBundle("Sprites");

	const clampy: Sprite = Sprite.from(Sprites.Clampy);
	const crab: Sprite = Sprite.from("ConitoCrab");
	
	console.log(clampy.width + " " + clampy.height);
	
	crab.x = 0;
	crab.y = 0;
	crab.anchor.set(0.5);
	crab.scale.set(0.75);
	crab.zIndex = 1;

	clampy.anchor.set(0.5);
	clampy.x = crab.x+190;
	clampy.y = crab.y+90;
	clampy.scale.set(0.25);
	clampy.zIndex = 2;

	const crabWithClamp: Container = new Container();
	crabWithClamp.sortableChildren = true;

	crabWithClamp.addChild(clampy);
	crabWithClamp.addChild(crab);

	crabWithClamp.x = app.screen.width-(app.screen.width / 2);
	crabWithClamp.y = app.screen.height-(app.screen.height / 2);
	
	crabWithClamp.angle = -15;

	app.stage.addChild(crabWithClamp);
}



