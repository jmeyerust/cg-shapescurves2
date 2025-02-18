class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        

        let p0 = {x: 100, y: 100};
        let p1 = {x: 120, y: 200};
        let p2 = {x: 320, y: 150};
        let p3 = {x: 300, y: 100};

        let p4 = {x: 400, y: 100};
        let p5 = {x: 460, y: 400};
        let p6 = {x: 550, y: 326};
        let p7 = {x: 600, y: 100};

        if (this.show_points) {
            this.drawVertex(p0, [255,0,0,255], framebuffer);
            this.drawVertex(p1, [255,0,0,255], framebuffer);
            this.drawVertex(p2, [255,0,0,255], framebuffer);
            this.drawVertex(p3, [255,0,0,255], framebuffer);
            this.drawVertex(p4, [255,0,0,255], framebuffer);
            this.drawVertex(p5, [255,0,0,255], framebuffer);
            this.drawVertex(p6, [255,0,0,255], framebuffer);
            this.drawVertex(p7, [255,0,0,255], framebuffer);
        }

        this.drawBezierCurve(p0, p1, p2, p3, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        this.drawBezierCurve(p4, p5, p6, p7, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        

        
        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        //this.drawLine({x: 100, y: 100}, {x: 600, y: 300}, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        this.drawCircle({x: 200, y: 200}, 50, 12, [255, 0, 0, 255], framebuffer);

        this.drawCircle({x: 400, y: 400}, 50, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        
        let vertex_list1 = [{x: 200, y: 100}, {x: 150, y:150}, {x:  175, y:  175}, {x: 225, y: 175}, {x: 250, y: 150}];
        let vertex_list2 = [{x:  400, y:  100}, {x: 300, y: 400}, {x: 380, y:480}, {x: 460, y:520}, {x: 555, y: 550}, {x: 580, y: 140}];
        
        if (this.show_points) {
            vertex_list1.forEach((vertex) => {
                this.drawVertex(vertex, [0, 0, 0, 255], framebuffer);
            });
            vertex_list2.forEach((vertex) => {
                this.drawVertex(vertex, [0, 0, 0, 255], framebuffer);
            });
        }

        this.drawConvexPolygon(vertex_list1, [255, 0, 0, 255], framebuffer);
        this.drawConvexPolygon(vertex_list2, [0, 0, 255, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        // Make empty list of points
        let points = new Array(num_edges + 1);
        points[0] = {x: p0.x, y: p0.y};

        // Generate each point using function
        let j = 1 / num_edges;
        for (let i = 1; i < num_edges; i++) {
            let t = j * i;
            let new_x = parseInt((((1 - t)**3) * p0.x) + (3 * ((1 - t)**2) * t * p1.x) + (3 * (1-t) * t**2 * p2.x) + (t**3 * p3.x));
            let new_y = parseInt((((1 - t)**3) * p0.y) + (3 * ((1 - t)**2) * t * p1.y) + (3 * (1-t) * t**2 * p2.y) + (t**3 * p3.y));
            console.log(new_x);
            console.log(new_y);
            points[i] = {x: new_x, y: new_y};
        }
        points[num_edges] = {x: p3.x, y: p3.y};

        console.log(points.length);
        
        //Draw line between each two points
        for (let i = 1; i < points.length; i++) {
            console.log(i);
            console.log("   (" + points[i-1].x + " , " + points[i-1].y + ")");
            console.log("   (" + points[i].x + " , " + points[i].y + ")");
            this.drawLine(points[i-1], points[i], color, framebuffer);
        }
    }
    
    
    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let vertices = [];
        let angle_step = (2*Math.PI) / num_edges;

        console.log(angle_step);

        for (let i = 0; i < num_edges; i++) {
            console.log(i);
            let new_x = parseInt(center.x + radius * Math.cos(i * angle_step));
            console.log("   " + new_x);
            let new_y = parseInt(center.y + radius * Math.sin(i * angle_step));
            console.log("   " + new_y);
            vertices[i] = {x: new_x, y: new_y};
        }

        for (let i = 1; i < vertices.length; i++) {
            this.drawLine(vertices[i-1], vertices[i], color, framebuffer);
        }
        this.drawLine(vertices[0], vertices[(vertices.length - 1)], color, framebuffer);

        console.log(vertices.length);
        if (this.show_points) {
            vertices.forEach((vertex) => {
                this.drawVertex(vertex, color, framebuffer);
            })
        }
        
    }

    
    

    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for (let i = 2; i < vertex_list.length; i++) {
            this.drawTriangle(vertex_list[0], vertex_list[i-1], vertex_list[i], color, framebuffer);
        }

    }
      
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        let v0 = {x: v.x, y: v.y - 3}; // Straight down
        let v1 = {x: v.x - 3, y: v.y}; // Straight left
        let v2 = {x: v.x, y: v.y + 3}; // Up and to the left
        let v3 = {x: v.x + 3, y: v.y}; // Down and to the left

        let v_list = [v0, v1, v2, v3];

        for (let i = 2; i<v_list.length; i++) {
            this.drawTriangle(v_list[0], v_list[i-1], v_list[i], color, framebuffer);
        }
        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer); // framebuffer width being read as low
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {

        // Deep copy input points
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};

        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);

        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
