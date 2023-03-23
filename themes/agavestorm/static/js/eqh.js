
class EqualHeight {
    constructor( selector ) {
        this.selector = selector;
        this.init();
        window.addEventListener("resize", ()=>{ this.resize(); } );
    }
    
    getColCount() {
        if( this.els.length == 0 ) {
            return 0;
        }

        let colCount = 0;
        let lastTop = this.els[0].getBoundingClientRect().top;
        for( let key in this.els ) {
            let top = this.els[key].getBoundingClientRect().top;
            if( lastTop != top ) {
                break;
            }
            colCount++;
        }
        return colCount;
    }
    
    adjustHeights( colCount ) {
        for(let curpos = 0; curpos<this.els.length; curpos=curpos+colCount) {
            let maxHeight=0;
            for( let i=curpos; i<colCount+curpos && i<this.els.length ;i++) {
                let height = this.els[i].getBoundingClientRect().height;
                if( height > maxHeight ) {
                    maxHeight = height;
                }
            }
            for( let i=curpos; i<colCount+curpos && i<this.els.length ;i++) {
                this.els[i].style.height = maxHeight + "px";
            }
        }
    }
    
    resize() {
//         console.log("resize");
        let colCount = this.getColCount();
        this.adjustHeights( colCount );
    }
    
    init() {
        this.els = document.querySelectorAll(this.selector);
        if( this.els.length == 0 ) {
            return;
        }
        this.resize();
    }
}

document.addEventListener("DOMContentLoaded", function(){ // page loaded and rendered
    new EqualHeight(".eqh");
});
