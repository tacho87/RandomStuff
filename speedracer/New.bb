

;-------------------------------------------------------------------------
; Setting graphs
Graphics  640, 480

SetBuffer BackBuffer ()

; random numbers using the clock function
SeedRnd MilliSecs()

;global variables of the player car, enemy truck, and enemy car
Global XposCar# = 305, YposCar# = 400, XposTruck# = Rnd (170, 430), YposTruck# = 0, XposCarEnemy#= Rnd (170,430), YposCarEnemy#= -200

;global variable speed
Global Speed# = 1

;global variables for the trees
Global Xtree1# = 25,Ytree1# = 50,Xtree2# = 525,Ytree2# = 50, Ytree3# = 350, Ytree4#=350

;global to display the score
Global ScoreDisplay$

;-------------------------------------------------------------------------
;main loop
;-------------------------------------------------------------------------


While Not KeyHit(1)
	Flip
	Cls
	;load map
	map()
	;load Trees
	Trees()
	;load player car
	PlayerCar (XposCar#, YposCar#)
	;load enemy truck
	EnemyTruck (XposTruck#, YposTruck)
	;load enemy car
	EnemyCar(XposCarEnemy#, YposCarEnemy#)
	;display the score and save it to the global variable scoredisplay$
	ScoreDisplay$ = DisplayScore()
	;load player movement
	PlayerMovement ()
	;enemytruck movement
	EnemyTruckMovement(XposTruck#, YposTruck#)
	;enemycar movement
	EnemyCarMovement (XposCarEnemy#, YposCarEnemy#)
	;collision detection
	Collision()
	
	
Wend



;map

Function map()
	
	;[Block]Margin, color red
	Color 255, 100, 20
	Rect 0,0,640,480,0
	;[End Block]
	
	
	;[Block]Middle line on the street, color white, 3 lines to make it bold.
	;
	Color 255,255,255
	Line 319, 0, 319, 480
	Line 320, 0, 320, 480
	Line 321, 0, 321, 480
	;[End Block]
	
	;[Block]Track
	;left side of the track, in white, four to make it bold
	Line 170, 0, 170, 480
	Line 171, 0, 171, 480
	Line 172, 0, 172, 480
	Line 173, 0, 173, 480
	;right side of the track, in white, fout to make it bold
	Line 470, 0, 470, 480
	Line 471, 0, 471, 480
	Line 472, 0, 472, 480
	Line 473, 0, 473, 480
	;[End Block]
	
	;[Block] grass
	;Grass
	Color 0,255,0
	Rect 0,0,170,480
	Rect 473,0, 640, 480
	;[End Block]
	

End Function

Function PlayerCar (x, y)
	
	Color 100,100,100
	Rect x,y,30, 60, 1
	XposCar# = x
	YposCar# = y
	
	
End Function

Function PlayerMovement ()
	; steer player 
	
	If KeyDown(203) Then
		;make the car move to the left
		XposCar# = XposCar - 6
	End If
	
	If KeyDown(205) Then
		;make the car move to the right
		XposCar# = XposCar +6
	End If
	;collision wall
	If XposCar# < 160 
		
		XposCar# = 160
	End If
	
	If XposCar# > 460 
		XposCar# = 460
	End If
	
	
	
	
	
End Function

Function EnemyTruck(x, y)
	
	;-------------------------------------------------------------------------
	;TRUCK ENEMY
	;-------------------------------------------------------------------------
	Color 255,100,100
	Rect x,y,50, 150, 1
	XposTruck# = x
	YposTruck# = y
	
	
End Function

Function EnemyCar(x, y)
	Color 255,255,100
	Rect x,y,40, 70, 1
	XposCarEnemy# = x
	YposCarEnemy# = y
	
End Function


Function EnemyTruckMovement(x,y)
	
	Pos = y 
	YposTruck# = YposTruck# + Speed#
	If Pos > 480 
		;create random position
		XposTruck = Rnd ( 170, 430)
		YposTruck = -160
		;the truck is used to increase the speed
		Speed# = Speed# + 1
	End If
	
	
End Function

Function EnemyCarMovement(x, y)
	Pos = y 
	YposCarEnemy = YposCarEnemy# + Speed#
	If Pos > 480 
		XposCarEnemy = Rnd (170, 430)
		YposCarEnemy = -160
		
	End If
	
End Function

Function Collision()
	;collision detection of the truck
	If RectsOverlap(XposCar#,YposCar#,30,60,XposTruck#,YposTruck#,40,150)
		Endgame()
	End If
	;collision detection of the enemy car
	If RectsOverlap(XposCar#,YposCar#,30,60,XposCarEnemy#,YposCarEnemy#,30,70)
		Endgame()
	End If
	
	
End Function

Function Endgame()
	Cls
	Color 0,150,100
	Text 150,200, "Your Maximun Score is: " + ScoreDisplay + " press ESC to exit"
	
	WaitKey
	
	
End Function

Function Trees()
	;trees
	Color 0, 105,0
	Oval Xtree1#, Ytree1#, 100,90,1
	Oval Xtree2#, Ytree2#, 100,90,1
	Oval 25,Ytree3#, 100, 90, 1
	Oval 525, Ytree4#, 100, 90,1
	
	;tree movement
	Ytree3# = Ytree3# + Speed
	Ytree4# = Ytree4# + Speed
	Ytree1# = Ytree1# + Speed
	Ytree2# = Ytree2# + Speed
	
	
	If Ytree3 And Ytree4 > 470 
		Ytree3 = -50
		Ytree4 = -50
	End If
	
	If Ytree1 And Ytree2  > 470
		Ytree1 = -50
		Ytree2 = -50
	End If
	
	
End Function

Function DisplayScore()
	Color 0,0,100
	
	score$ = score$ + (Speed#*1000)
	
	Text 20, 430, "SCORE: " + score$
	Return score$
End Function


;~IDEal Editor Parameters:
;~F#3B#3D#43#58#62#6C#88#95#9E#AD#B8#C5#CF#EB
;~C#Blitz3D