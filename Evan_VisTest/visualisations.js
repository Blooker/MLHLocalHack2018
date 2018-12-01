function Visualisations () {
    
    this.vis = [];
    this.selectedVis = null;
    
    this.addVis = function (visualisation) {
        this.vis.push(visualisation);
        
        if(this.selectedVis == null){
            this.selectVis(0);
        }
    }
    
    this.selectVis = function(visIndex){
        this.selectedVis = this.vis[visIndex];
    }
    
    this.setupVis = function () {
        for (var i=0; i<this.vis.length; i++) {
            this.vis[i].setup();
        }
    }
}