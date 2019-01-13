class Ball extends BasicElement {
    constructor () {
        super();
        this.shape = "round";
        this.sectionIndexes = [];
        this.mobile = true;
        this.lastCollisionObject = undefined;
        return this;
    }

    draw (ctx) {
        if (this.mass != undefined && this.density != undefined) {
            this.area = (this.mass*1000000) / this.density;
            this.radius = Math.sqrt(this.area/Math.PI);
            
            if (this.gradient == false || this.gradient == undefined) {
                ctx.fillStyle = this.color;
            } else {
                var grd = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.radius*1);
                grd.addColorStop(0, this.color);
                grd.addColorStop(0.6, this.color);
                grd.addColorStop(1, "white");
    
                ctx.fillStyle = grd;
            }

            ctx.moveTo(this.position.x, this.position.y);
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle ="#000000";
        }
    }

    checkOneCollision (collisionObject) {
        if (collisionObject != this) {
            switch (collisionObject.shape) {
                case "round":
                    var bp1 = this.position;
                    var br1 = this.radius;
                    var bv1 = this.velocity;
                    var bm1 = this.mass;
                    var bp2 = collisionObject.position;
                    var br2 = collisionObject.radius;
                    var bv2 = collisionObject.velocity;
                    var bm2 = collisionObject.mass;

                    var V = new Vector2D(bp2.x - bp1.x, bp2.y - bp1.y);
                    var distance = V.getLength() - br1 - br2;

                    if (distance <= 0) {
                        if (collisionObject != this.lastCollisionObject || collisionObject.lastCollisionObject != this) {
                            return true;
                        }
                    }
                    break;
                case "rectangular":
                    var bp1 = this.position;
                    var br1 = this.radius;
                    var rp1 = collisionObject.position;
                    var rw1 = collisionObject.width;
                    var rh1 = collisionObject.height;
                    var collisionPoint;

                    var V = new Vector2D(bp1.x - rp1.x, bp1.y - rp1.y);
                    V.clampX((-1)*rw1/2, rw1/2);
                    V.clampY((-1)*rh1/2, rh1/2);
                    collisionPoint = new Vector2D(V.x + rp1.x, V.y + rp1.y);
                    V.setVector(bp1.x - (V.x + rp1.x), bp1.y - (V.y + rp1.y));

                    var distance = V.getLength() - br1;

                    if (distance <= 0 && this.inCollision != true) {
                        if (collisionObject != this.lastCollisionObject || collisionObject.lastCollisionObject != this) {
                            return true;
                        }
                    }
                    break;
            }
        }
        return false;
    }

    checkCollision (frequencyFactor) {
        // console.log("before: "+(parseFloat(this.velocity.getLength())))
        var proportion;

        this.inCollision = false;
        if (this.lastCollisionObject != undefined) {
            if (this.lastCollisionObject.shape == "rectangular") {
                if (this.checkOneCollision(this.lastCollisionObject) == true) {
                    this.inCollision = true;
                }
            }
        }
        for (var s = 0; s < this.sectionIndexes.length; s++) {
            for (var i = 0; i < time.space.sections[this.sectionIndexes[s]].elements.length; i++) {
                var collisionObject = time.space.sections[this.sectionIndexes[s]].elements[i];
                if (collisionObject != this) {
                    switch (collisionObject.shape) {
                        case "round":
                            var bp1 = this.position;
                            var br1 = this.radius;
                            var bv1 = this.velocity;
                            var bm1 = this.mass;
                            var bp2 = collisionObject.position;
                            var br2 = collisionObject.radius;
                            var bv2 = collisionObject.velocity;
                            var bm2 = collisionObject.mass;

                            var V = new Vector2D(bp2.x - bp1.x, bp2.y - bp1.y);
                            var distance = V.getLength() - br1 - br2;

                            if (distance <= 0) {
                                if (collisionObject != this.lastCollisionObject || collisionObject.lastCollisionObject != this) {
                                    //this.inCollision = true;
                                    this.lastCollisionObject = collisionObject;
                                    collisionObject.lastCollisionObject = this;

                                    var deltaPos = new Vector2D(bp1.x - bp2.x, bp1.y - bp2.y);
                                    var collisionAngle = Math.atan2(deltaPos.y, deltaPos.x);

                                    var angle1 = Math.atan2(bv1.y, bv1.x);
                                    var angle2 = Math.atan2(bv2.y, bv2.x);

                                    var vel1 = new Vector2D(bv1.getLength() * Math.cos(angle1 - collisionAngle), bv1.getLength() * Math.sin(angle1 - collisionAngle));
                                    var vel2 = new Vector2D(bv2.getLength() * Math.cos(angle2 - collisionAngle), bv2.getLength() * Math.sin(angle2 - collisionAngle));

                                    var finalVel1 = new Vector2D(((bm1 - bm2) * vel1.x + (bm2 + bm2) * vel2.x)/(bm1 + bm2), vel1.y);
                                    var finalVel2 = new Vector2D(((bm1 + bm1) * vel1.x + (bm2 - bm1) * vel2.x)/(bm1 + bm2), vel2.y);

                                    this.velocity = new Vector2D(parseInt((Math.cos(collisionAngle) * finalVel1.x + Math.cos(collisionAngle + Math.PI/2) * finalVel1.y)*1000000)/1000000,
                                                                parseInt((Math.sin(collisionAngle) * finalVel1.x + Math.sin(collisionAngle + Math.PI/2) * finalVel1.y)*1000000)/1000000);

                                    collisionObject.velocity = new Vector2D(parseInt((Math.cos(collisionAngle) * finalVel2.x + Math.cos(collisionAngle + Math.PI/2) * finalVel2.y)*1000000)/1000000,
                                                                            parseInt((Math.sin(collisionAngle) * finalVel2.x + Math.sin(collisionAngle + Math.PI/2) * finalVel2.y)*1000000)/1000000);

                                }
                            }
                            break;
                        case "rectangular":
                            var bp1 = this.position;
                            var br1 = this.radius;
                            var rp1 = collisionObject.position;
                            var rw1 = collisionObject.width;
                            var rh1 = collisionObject.height;
                            var collisionPoint;

                            var V = new Vector2D(bp1.x - rp1.x, bp1.y - rp1.y);
                            V.clampX((-1)*rw1/2, rw1/2);
                            V.clampY((-1)*rh1/2, rh1/2);
                            collisionPoint = new Vector2D(V.x + rp1.x, V.y + rp1.y);
                            V.setVector(bp1.x - (V.x + rp1.x), bp1.y - (V.y + rp1.y));

                            var distance = V.getLength() - br1;

                            if (distance <= 0 && this.inCollision != true) {
                                if (collisionObject != this.lastCollisionObject || collisionObject.lastCollisionObject != this) {
                                    this.inCollision = true;
                                    this.lastCollisionObject = collisionObject;
                                    collisionObject.lastCollisionObject = this;

                                    var topSide = rp1.y - rh1/2;
                                    var leftSide = rp1.x - rw1/2;
                                    var rightSide = rp1.x + rw1/2;
                                    var bottomSide = rp1.y + rh1/2;

                                    var atan = Math.atan2(this.velocity.y, this.velocity.x)*180/Math.PI;

                                    if (collisionPoint.y == topSide && collisionPoint.x == leftSide) {
                                        if (atan >= 90) {
                                            this.velocity = new Vector2D(this.velocity.x, (-1)*this.velocity.y);
                                        } else if (atan < 90 && atan >= 0) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, (-1)*this.velocity.y);
                                        } else if (atan < 0 && atan >= -90) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, this.velocity.y);
                                        } else if (atan < -90) {

                                        }
                                    } else if (collisionPoint.y == topSide && collisionPoint.x == rightSide) {
                                        if (atan >= 90) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, (-1)*this.velocity.y);
                                        } else if (atan < 90 && atan >= 0) {
                                            this.velocity = new Vector2D(this.velocity.x, (-1)*this.velocity.y);
                                        } else if (atan < 0 && atan >= -90) {
                                            
                                        } else if (atan < -90) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, this.velocity.y);                                        
                                        }
                                    } else if (collisionPoint.y == bottomSide && collisionPoint.x == leftSide) {
                                        if (atan >= 90) {

                                        } else if (atan < 90 && atan >= 0) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, this.velocity.y);
                                        } else if (atan < 0 && atan >= -90) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, (-1)*this.velocity.y);
                                        } else if (atan < -90) {
                                            this.velocity = new Vector2D(this.velocity.x, (-1)*this.velocity.y);                                        
                                        }
                                    } else if (collisionPoint.y == bottomSide && collisionPoint.x == rightSide) {
                                        if (atan >= 90) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, this.velocity.y);
                                        } else if (atan < 90 && atan >= 0) {
                                            
                                        } else if (atan < 0 && atan >= -90) {
                                            this.velocity = new Vector2D(this.velocity.x, (-1)*this.velocity.y);
                                        } else if (atan < -90) {
                                            this.velocity = new Vector2D((-1)*this.velocity.x, (-1)*this.velocity.y);                                        
                                        }
                                    }
                                    else if (collisionPoint.y == topSide)
                                        this.velocity = new Vector2D(this.velocity.x, (-1)*this.velocity.y);

                                    else if (collisionPoint.x == leftSide)
                                        this.velocity = new Vector2D((-1)*this.velocity.x, this.velocity.y);

                                    else if (collisionPoint.x == rightSide)
                                        this.velocity = new Vector2D((-1)*this.velocity.x, this.velocity.y);

                                    else if (collisionPoint.y == bottomSide)
                                        this.velocity = new Vector2D(this.velocity.x, (-1)*this.velocity.y);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        this.position.x += (parseInt(1000000*(1/(frequencyFactor * 2) * this.velocity.x * (1/(1000 / time.framesPerSecond))))/1000000)*this.timeYouHave;
        this.position.y += (parseInt(1000000*(1/(frequencyFactor * 2) * this.velocity.y * (1/(1000 / time.framesPerSecond))))/1000000)*this.timeYouHave;
    }
}