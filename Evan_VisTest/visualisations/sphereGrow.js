function SphereGrow () {
    this.name = "Sphere Grow";
    
    this.lastScale = -1;
    this.rippleDiff = 100;
    
    this.ripples = [];
    
    this.sphereColMax = null;
    
    this.setup = function () {
        this.setRandomColMax();
        console.log(this.sphereColMax);
    }
    
    this.draw = function (amp) {        
        var dirY = (mouseY / height - 0.5) *2;
        var dirX = (mouseX / width - 0.5) *2;

        vol = amp.getLevel();

        noStroke();

        push();
        directionalLight(155, 155, 155, -dirX, -dirY, -0.25);
        
        scale(currentScale);
        
//        var colorChange = map(255-constrain(vol*510, 0, 255), 0, 255, 0, 150);
                
        var red = 255 - constrain(255/this.sphereColMax[0]*vol*100, 0, 255);
        var green = 255 - constrain(255/this.sphereColMax[1]*vol*100, 0, 255);
        var blue = 255 - constrain(255/this.sphereColMax[2]*vol*100, 0, 255);
        
        ambientMaterial(red, green, blue);
        
        var thisScale = vol*800;
        sphere(thisScale);
        
        scale(1/currentScale);
        
        ambientMaterial(0);
        pop();
                
        if (thisScale - this.lastScale > this.rippleDiff) {
            this.createRipple();
            this.setRandomColMax();
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
    
    this.setRandomColMax = function () {
        var cols = [];
        var sum = 0;
        
        var extremeValue = random(3);
        
        for (var i=0; i<3; i++) {
            if (i==2) {
                cols.push(255-sum)
            } else {
                var val = 127;
                if (i == extremeValue) {                
                    while (val > 70 && val < 130) {
                        val = random(255-sum);
                    }
                } else {
                    val = random(255-sum);
                }

                sum += val;
                cols.push(val);
            }
        }
        
        this.sphereColMax = cols;
    }
}