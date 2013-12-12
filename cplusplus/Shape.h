#ifndef SHAPE_H
#define SHAPE_H

#include <windows.h>


//Base Class
class Shape
{
public:
	//Constructor
	Shape(const POINT u, const POINT v, 
		const LOGPEN & lp, const LOGBRUSH & lb);	//Initiates with the 2 points struct, and 2 references of the brush and pen

	//Destructor
	virtual ~Shape(); 								//Semi Abstract or Virtual so each derived may delete their resources 

	//Methods
	void setStartPt(const POINT & p0);				//Method for the start point of the shape drawing, it accepts POINT struct and uses it as Reference for direct manipulation
	void setEndPt(const POINT & p1);				//Method for the End Poin of the shape, It accepts a POINT STRUCT and uses a references for direct manipulation of the object
	
	virtual void draw(HDC hdc) = 0;					//Full Virtual or Abstract method for drawing each shape, it accepts a HDC object which is the Handle Device CONTEXT for drwaing on the application Window. Each Derived Will need to modify this method.
	
protected:

	//Fields
	POINT mPt0;										//Point Structure for holding the first point object
	POINT mPt1;										//Point Structure for holding the Second (or end) of the point object
	HPEN mhPen;										//HPEN Struct for holding the drawing pen for the current selected shape
	HBRUSH mhBrush;									//HBRUSH Struct for holding the drawing Brush per object shape.

	HPEN mhOldPen;									//Holder for the return Pen when we create the method (good practice)
	HBRUSH mhOldBrush;								//Holder for the return Brush when we create the method (good practice)
	
};


//Derived Classes

//When using the class implementation in the header file, do not need to pass the base constructor types since 
//it will be implemented in the .cpp implementation file

class LineShape : public Shape
{
public:
	LineShape(const POINT u, const POINT v,
		const LOGPEN & lp, const LOGBRUSH & lb);

	void draw(HDC hdc);

};


class RectShape : public Shape
{
public:
	RectShape (const POINT u, const POINT v,
		const LOGPEN & lp, const LOGBRUSH & lb);

	void draw(HDC hdc);
	
};


class EllipseShape : public Shape
{
public:
	EllipseShape (const POINT u, const POINT v,
		const LOGPEN & lp, const LOGBRUSH & lb);

	void draw(HDC hdc);
	
};

class CubeShape : public Shape
{
public:
	CubeShape (const POINT u, const POINT v,
		const LOGPEN & lp, const LOGBRUSH & lb);

	void draw(HDC hdc);
	
};


#endif //END DIRECTIVE