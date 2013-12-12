#include <windows.h>
#include <string>
#include "Shape.h"
#include "resource.h" //Load the menu
#include <vector>
using namespace std;




//===============================================================
//GLOBALS

const COLORREF BLACK = RGB(0,0,0);
const COLORREF WHITE = RGB(255,255,255);
const COLORREF RED	 = RGB(255,0,0);
const COLORREF GREEN = RGB(0,255,0);
const COLORREF BLUE	 = RGB(0,0,255);


//Store Handles to the main windows and application globally and menu
HWND		ghMainWnd 		= 0;
HINSTANCE	ghAppInst		= 0;
HMENU		ghMenu			= 0;



bool gMouseDown= false;

int gCurrPrimSel			=ID_PRIMITIVE_CUBE;
int gCurrPenColSel			=ID_PENCOLOR_BLACK;
int gCurrBrushColSel		=ID_BRUSHCOLOR_BLACK;
int gCurrPenStyleSel		=ID_PENSTYLE_SOLID;
int gCurrBrushStyleSel		=ID_BRUSHSTYLE_NULL;

LOGPEN gLogPen;
LOGBRUSH gLogBrush;


//Class
Shape* gShape = 0;
vector<Shape*> gShapes;



//===============================================================




//Step 1: Define and implement windows procedure(HOW THE APP HANDLES THE MESSAGES)
LRESULT CALLBACK WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam)
{ 
	// Objects for painting
	HDC hdc = 0; //Handle device context
	PAINTSTRUCT ps;

	//LOCAL POINT variables we will use in some of the case statement
	POINT p0;
	POINT p1;



	switch (msg)
	{

	case WM_CREATE:
		CheckMenuItem (ghMenu, ID_PRIMITIVE_CUBE, MF_CHECKED);
		CheckMenuItem (ghMenu, ID_PENCOLOR_BLACK, MF_CHECKED);
		CheckMenuItem (ghMenu, ID_BRUSHCOLOR_BLACK, MF_CHECKED);
		CheckMenuItem (ghMenu, ID_PENSTYLE_SOLID, MF_CHECKED);
		CheckMenuItem (ghMenu, ID_BRUSHSTYLE_NULL, MF_CHECKED);
		return 0;


	case WM_COMMAND:
		switch (LOWORD (wParam) )
		{
			//===============================
			//FILE MENU
			//===============================
		case ID_FILE_EXIT:
			DestroyWindow(ghMainWnd);
			return 0;
			//===============================
			//Primitive Types (Shape Types)
			//===============================

	

		case ID_PRIMITIVE_LINE:
			CheckMenuItem (ghMenu, ID_PRIMITIVE_LINE, MF_CHECKED );
			CheckMenuItem (ghMenu, gCurrPrimSel, MF_UNCHECKED);
			gCurrPrimSel = ID_PRIMITIVE_LINE;
			return 0;

		case ID_PRIMITIVE_RECTANGLE:
			CheckMenuItem (ghMenu, ID_PRIMITIVE_RECTANGLE, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPrimSel, MF_UNCHECKED);
			gCurrPrimSel = ID_PRIMITIVE_RECTANGLE;
			return 0;

		case ID_PRIMITIVE_ELLIPSE:
			CheckMenuItem (ghMenu, ID_PRIMITIVE_ELLIPSE, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPrimSel, MF_UNCHECKED);
			gCurrPrimSel = ID_PRIMITIVE_ELLIPSE;
			return 0;

		case ID_PRIMITIVE_CUBE:
			CheckMenuItem (ghMenu, ID_PRIMITIVE_CUBE, MF_CHECKED );
			CheckMenuItem (ghMenu, gCurrPrimSel, MF_UNCHECKED);
			gCurrPrimSel = ID_PRIMITIVE_CUBE;
			return 0;

		case ID_UNDO_UND:
			if (gShapes.size() > 0 )
			{
				gShapes.pop_back();
				InvalidateRect(hWnd, 0, true);

			}
			return 0;
			//================================
			//PEN COLORS
			//================================
		case ID_PENCOLOR_BLACK:
			CheckMenuItem (ghMenu, ID_PENCOLOR_BLACK, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenColSel, MF_UNCHECKED);
			gCurrPenColSel = ID_PENCOLOR_BLACK;
			gLogPen.lopnColor = BLACK;
			return 0;

		case ID_PENCOLOR_WHILE:
			CheckMenuItem (ghMenu, ID_PENCOLOR_WHILE, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenColSel, MF_UNCHECKED);
			gCurrPenColSel = ID_PENCOLOR_WHILE;
			gLogPen.lopnColor = WHITE;
			return 0;

		case ID_PENCOLOR_RED:
			CheckMenuItem (ghMenu, ID_PENCOLOR_RED, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenColSel, MF_UNCHECKED);
			gCurrPenColSel = ID_PENCOLOR_RED;
			gLogPen.lopnColor = RED;
			return 0;

		case ID_PENCOLOR_GREEN:
			CheckMenuItem (ghMenu, ID_PENCOLOR_GREEN, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenColSel, MF_UNCHECKED);
			gCurrPenColSel = ID_PENCOLOR_GREEN;
			gLogPen.lopnColor = GREEN;
			return 0;

		case ID_PENCOLOR_BLUE:
			CheckMenuItem (ghMenu, ID_PENCOLOR_BLUE, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenColSel, MF_UNCHECKED);
			gCurrPenColSel = ID_PENCOLOR_BLUE;
			gLogPen.lopnColor = BLUE;
			return 0;

			//=================================
			//Brusg Colors
			//=================================

		case ID_BRUSHCOLOR_BLACK:
			CheckMenuItem (ghMenu, ID_BRUSHCOLOR_BLACK, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushColSel, MF_UNCHECKED);
			gCurrBrushColSel = ID_BRUSHCOLOR_BLACK;
			gLogBrush.lbColor = BLACK;
			return 0;

		case ID_BRUSHCOLOR_WHITE:
			CheckMenuItem (ghMenu, ID_BRUSHCOLOR_WHITE, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushColSel, MF_UNCHECKED);
			gCurrBrushColSel = ID_BRUSHCOLOR_WHITE;
			gLogBrush.lbColor = WHITE;
			return 0;

		case ID_BRUSHCOLOR_RED:
			CheckMenuItem (ghMenu, ID_BRUSHCOLOR_RED, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushColSel, MF_UNCHECKED);
			gCurrBrushColSel = ID_BRUSHCOLOR_RED;
			gLogBrush.lbColor = RED;
			return 0;

		case ID_BRUSHCOLOR_GREEN:
			CheckMenuItem (ghMenu,ID_BRUSHCOLOR_GREEN, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushColSel, MF_UNCHECKED);
			gCurrBrushColSel = ID_BRUSHCOLOR_GREEN;
			gLogBrush.lbColor = GREEN;
			return 0;

		case ID_BRUSHCOLOR_BLUE:
			CheckMenuItem (ghMenu, ID_BRUSHCOLOR_BLUE, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushColSel, MF_UNCHECKED);
			gCurrBrushColSel = ID_BRUSHCOLOR_BLUE;
			gLogBrush.lbColor = BLUE;
			return 0;


			//=======================================
			//Pen Styles
			//=======================================
		case ID_PENSTYLE_SOLID:
			CheckMenuItem (ghMenu, ID_PENSTYLE_SOLID, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenStyleSel, MF_UNCHECKED);
			gCurrPenStyleSel = ID_PENSTYLE_SOLID;
			gLogPen.lopnStyle = PS_SOLID;
			return 0;

		case ID_PENSTYLE_DOTTED:
			CheckMenuItem (ghMenu, ID_PENSTYLE_DOTTED, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenStyleSel, MF_UNCHECKED);
			gCurrPenStyleSel = ID_PENSTYLE_DOTTED;
			gLogPen.lopnStyle = PS_DOT;
			return 0;

		case ID_PENSTYLE_DASHED:
			CheckMenuItem (ghMenu, ID_PENSTYLE_DASHED, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrPenStyleSel, MF_UNCHECKED);
			gCurrPenStyleSel = ID_PENSTYLE_DASHED;
			gLogPen.lopnStyle = PS_DASH;
			return 0;

			//=======================================
			//BRUSH STYLES
			//======================================

		case ID_BRUSHSTYLE_SOLID:
			CheckMenuItem (ghMenu, ID_BRUSHSTYLE_SOLID, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushStyleSel, MF_UNCHECKED);
			gCurrBrushStyleSel = ID_BRUSHSTYLE_SOLID;
			gLogBrush.lbStyle = BS_SOLID;
			return 0;

		case ID_BRUSHSTYLE_NULL:
			CheckMenuItem (ghMenu, ID_BRUSHSTYLE_NULL, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushStyleSel, MF_UNCHECKED);
			gCurrBrushStyleSel = ID_BRUSHSTYLE_NULL;
			gLogBrush.lbStyle = BS_NULL;
			return 0;

		case ID_BRUSHSTYLE_DIAGONAL:
			CheckMenuItem (ghMenu, ID_BRUSHSTYLE_DIAGONAL, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushStyleSel, MF_UNCHECKED);
			gCurrBrushStyleSel = ID_BRUSHSTYLE_DIAGONAL;
			gLogBrush.lbStyle = BS_HATCHED;
			gLogBrush.lbHatch = HS_BDIAGONAL;
			return 0;

		case ID_BRUSHSTYLE_CROSS:
			CheckMenuItem (ghMenu, ID_BRUSHSTYLE_CROSS, MF_CHECKED);
			CheckMenuItem(ghMenu, gCurrBrushStyleSel, MF_UNCHECKED);
			gCurrBrushStyleSel = ID_BRUSHSTYLE_CROSS;
			gLogBrush.lbStyle = BS_HATCHED;
			gLogBrush.lbHatch = HS_CROSS;
			return 0;
		}






		//Left Mouse Click
	case WM_LBUTTONDOWN:

		//Capture the mouse (we still get mouse input event after the mouse cursor moves off the client area
		SetCapture (hWnd);
		gMouseDown = true;

		//Point that was clicked is stored in the lParam
		p0.x = LOWORD(lParam);
		p0.y = HIWORD (lParam);

		// We dont know the end point yet, so set to zero
		p1.x = 0;
		p1.y = 0;

		//  Create the shape based on what shape the user has selected in the menu

		switch (gCurrPrimSel )
		{
		case ID_PRIMITIVE_LINE:
			gShape = new LineShape (p0, p1, gLogPen, gLogBrush);
			break;
		case ID_PRIMITIVE_RECTANGLE:
			gShape = new RectShape (p0, p1, gLogPen, gLogBrush);
			break;
		case ID_PRIMITIVE_ELLIPSE:
			gShape = new EllipseShape (p0, p1, gLogPen, gLogBrush);
			break;
		case ID_PRIMITIVE_CUBE:
			gShape = new CubeShape (p0,p1,gLogPen , gLogBrush);
			break;
		}

		return 0;

	case WM_MOUSEMOVE:
		if (gMouseDown)
		{
			// Current mouse position is stored in the lParam.
			p1.x = LOWORD(lParam);
			p1.y = HIWORD(lParam);

			//Update the end point of the current temporary
			//shape based on the mouse position.

			gShape->setEndPt (p1);

			//repaint the window 
			InvalidateRect(hWnd, 0, true);

		}

		return 0;

	case WM_LBUTTONUP:
		//Release the captured mouse
		ReleaseCapture ();
		gMouseDown = false;

		// current position in lParam
		p1.x = LOWORD (lParam);
		p1.y = HIWORD (lParam);

		//update the end point in the temporary shape

		gShape->setEndPt (p1);

		//the user lifted the left mouse buttom
		gShapes.push_back( gShape);

		InvalidateRect(hWnd, 0, true);

		return 0;

	case WM_PAINT:
		hdc = BeginPaint(hWnd, &ps);

		// Only draw temporary shape if the mouse is down
		if (gMouseDown )
			gShape->draw(hdc);

		
		// Draw all the permanent shapes.
		for (int i = 0; i < gShapes.size(); ++i)
			gShapes[i]->draw(hdc);

		EndPaint(hWnd, &ps);



		//Key Down Handle
	case WM_KEYDOWN:
		if (wParam ==  VK_ESCAPE )	
		{			
			DestroyWindow (ghMainWnd);

		}
		return 0;	
		//Destroy Handler
	case WM_DESTROY:
		
		PostQuitMessage (0);
		return 0;


		}
		//Forward to default WIN Handlers
		return DefWindowProc (hWnd, msg, wParam, lParam);


	}
	


	//WinMain 
	int WINAPI WinMain (HINSTANCE hInstance, HINSTANCE hPrevInstance, PSTR cmdLine, int showCmd)
	{

		//Save Handle to the application instance
		ghAppInst 			= hInstance;



		//Step 2: fill out a WNDCLASS instance
		WNDCLASS wc;
		wc.style 			= CS_HREDRAW | CS_VREDRAW ;
		wc.lpfnWndProc 		= WndProc;
		wc.cbClsExtra		= 0;
		wc.cbWndExtra 		= 0;
		wc.hInstance 		= ghAppInst;
		wc.hIcon 			= ::LoadIconA(0,IDI_APPLICATION );
		wc.hCursor 			= ::LoadCursorA(0, IDC_ARROW);
		wc.hbrBackground 	= (HBRUSH)::GetStockObject (WHITE_BRUSH);
		wc.lpszMenuName 	= 0;
		wc.lpszClassName 	= "MyWndClassName";


		ghMenu 				= LoadMenu (0, MAKEINTRESOURCE(IDR_MENU1));

		//Step 3: Register the WNDCLASS instance with windows.
		RegisterClass( &wc );

		//Step 4: Create Window App and the handle in global window
		ghMainWnd =::CreateWindow("MyWndClassName", "MyWindow", WS_OVERLAPPEDWINDOW, 0, 0, 500, 500, 0, ghMenu, ghAppInst, 0);

		if (ghMainWnd == 0)
		{
			::MessageBoxA (0, "CreateWindow - Failed", 0, 0);
			return false;
		}

		//Step 5: Show and update window
	ShowWindow (ghMainWnd, showCmd );
	UpdateWindow (ghMainWnd );

	//Step 6: Enter the message loop and quit only when WM_QUIT message is received
	MSG msg;
	ZeroMemory (&msg, sizeof (MSG));

	while ( GetMessage (&msg, 0, 0, 0) )
	{

		TranslateMessage (&msg);
		DispatchMessage (&msg);
	}

	for (int i=0 ; i< gShapes.size(); ++i)
		delete gShapes[i];


	// Return exit code back to os
	return (int) msg.wParam;


}