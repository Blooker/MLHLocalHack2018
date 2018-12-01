function SphereGrow () {
    this.name = "Sphere Grow";
    
    this.lastScale = -1;
    this.rippleDiff = 100;
    
    this.ripples = [];
    
    this.setup = function () {
        
    }
    
    this.draw = function (amp) {        
        var dirY = (mouseY / height - 0.5) *2;
        var dirX = (mouseX / width - 0.5) *2;

        vol = amp.getLevel();

        noStroke();

        push();
        directionalLight(250, 250, 250, -dirX, -dirY, -0.25);
        
        scale(currentScale);
        
        var colorChange = 255-constrain(vol*510, 0, 255);
        ambientMaterial(255, colorChange, colorChange);
        
        var thisScale = vol*800;
        sphere(thisScale);
        
        scale(1/currentScale);
        
        ambientMaterial(0);
        pop();
                
        if (thisScale - this.lastScale > this.rippleDiff) {
            this.createRipple();
        }
        
        this.drawRipples();
        
        this.lastScale = thisScale;
    }
    
    this.createRipple = function () {
        this.ripples.splice(0, 0, {scale: 0, col:color(random(255),random(255),random(255))});
    }
    
    this.drawRipples = function () {                
        for (var i=0; i<this.ripples.length; i++) {            
            this.ripples[i].scale += 40;
            
            ambientMaterial(this.ripples[i].col);
            
            translate(0, 0, -100);
            scale(this.ripples[i].scale);
            torus(1, 0.1);
            scale(1/this.ripples[i].scale);
            translate(0, 0, 100);
            
            ambientMaterial(0);
            
            if (this.ripples[i].scale > 3000) {
                this.ripples.pop(this.ripples.length);
                break;
            }
        }
    }
}