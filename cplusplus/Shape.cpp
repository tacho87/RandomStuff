//SHAPE.CPP
#include "Shape.h"





//SHAPE CLASS IMPLEMENTATION
Shape::Shape (const POINT u, const POINT v,
	const LOGPEN& lp, const LOGBRUSH & lb)
{

	mPt0.x = u.x;
	mPt0.y = u.y;
	mPt1.x = v.x;
	mPt1.y = v.y;
	mhPen  = CreatePenIndirect(&lp);
	mhBrush = CreateBrushIndirect(&lb);


	mhOldPen = 0;
	mhOldBrush = 0;
	

}

Shape::~Shape()
{
	DeleteObject (mhPen);
	DeleteObject (mhBrush);
}

void Shape::setStartPt(const POINT & p0)
{
	mPt0 = p0;
}

void Shape::setEndPt (const POINT & p1)
{
	mPt1 = p1;
}






//LINE SHAPE IMPLEMENTATION

LineShape::LineShape (const POINT u, const POINT v,
	const LOGPEN & lp, const LOGBRUSH & lb)
	: Shape (u, v, lp, lb)
{

}

void LineShape::draw( HDC hdc)
{

	//Select the current pen and brush
	mhOldPen = (HPEN) SelectObject(hdc, mhPen);
	mhOldBrush = (HBRUSH) SelectObject(hdc, mhBrush);

	//Draw Line
	MoveToEx(hdc, mPt0.x, mPt0.y, 0);
	LineTo(hdc, mPt1.x, mPt1.y );

	//Restore the old pen and brush
	SelectObject(hdc, mhOldPen);
	SelectObject(hdc, mhOldBrush);
	
}


//Rect Shape Implementation

RectShape::RectShape (const POINT u, const POINT v,
	const LOGPEN& lp, const LOGBRUSH& lb): Shape (u, v, lp, lb)
{

}

void RectShape::draw(HDC hdc)
{

	mhOldPen = (HPEN) SelectObject(hdc, mhPen);
	mhOldBrush = (HBRUSH) SelectObject(hdc, mhBrush);

	Rectangle(hdc, mPt0.x, mPt0.y, mPt1.x, mPt1.y);

	SelectObject(hdc, mhOldPen);
	SelectObject(hdc, mhOldBrush);
}


//Ellipse Shape Implementation

EllipseShape::EllipseShape(const POINT u, const POINT v, 
	const LOGPEN& lp, const LOGBRUSH& lb) : Shape (u, v, lp, lb)
{

}

void EllipseShape::draw (HDC hdc)
{
	mhOldPen = (HPEN) SelectObject (hdc, mhPen);
	mhOldBrush = (HBRUSH) SelectObject (hdc, mhBrush);

	Ellipse (hdc, mPt0.x,mPt0.y, mPt1.x, mPt1.y);

	SelectObject (hdc, mhOldPen);
	SelectObject (hdc, mhOldBrush);
	
}

//cube

CubeShape::CubeShape(const POINT u, const POINT v, const LOGPEN &lp, const LOGBRUSH &lb) : Shape(u, v, lp, lb)
{

}

void CubeShape::draw(HDC hdc)
{

	
	mhOldPen = (HPEN) SelectObject(hdc, mhPen);
	mhOldBrush = (HBRUSH) SelectObject(hdc, mhBrush);

	Rectangle(hdc, mPt0.x+50, mPt0.y-50, mPt1.x +50, mPt1.y-50);


	MoveToEx(hdc, mPt0.x, mPt0.y, 0);
	LineTo(hdc, mPt0.x+50, mPt0.y-50 );

	MoveToEx(hdc, mPt1.x, mPt0.y, 0);
	LineTo(hdc, mPt1.x+50, mPt0.y-50 );

	

	
	MoveToEx(hdc, mPt1.x, mPt1.y, 0);
	LineTo(hdc, mPt1.x+50, mPt1.y-50 );

	MoveToEx(hdc, mPt0.x, mPt1.y, 0);
	LineTo(hdc, mPt0.x+50, mPt1.y-50 );




	Rectangle(hdc, mPt0.x, mPt0.y, mPt1.x, mPt1.y);

	SelectObject(hdc, mhOldPen);
	SelectObject(hdc, mhOldBrush);

}
