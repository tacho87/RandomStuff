#include <iostream>
#include <string>
using namespace std;
//Stack is a linked list implementation using FIFO FIRST IN FIRST OUT APPROACH.
//Push(), Pop()


class Node 
{
public:
	string value;
	Node* Next;
};

class StackLinkedList
{

public:
	StackLinkedList()
	{
		//When the class is instantiated, this dummy head node is created because I dont know how to do it differently in C++ (We need to handle the pointers so, this is how I found)
		head = new Node();
		head->Next = NULL;
		head->value = "";
	}
	~StackLinkedList()
	{
		delete head;
	}

	void Push( string value)
	{
		//First item has to be the last item inserted.
		Node* OriginalHead = head;
		head = new Node();
		head->value = value;
		head->Next = OriginalHead;
	}
	string Pop()
	{
		//Get the info and then point to the next linked list and make it head;
		if (head != NULL)
		{
			string item = head->value;
			Node* del = head;
			head = head->Next;
			delete del;
			return item;
		}
		return "End Of Stack";
	}
	void PrintEntireStack()
	{
		Node * Temp = NULL;
		Temp = head;
		while(Temp != NULL)
		{
			cout << Temp->value << endl;
			Temp = Temp->Next;
		}	
	}

private:

	//This has to be the top item on the stack always pointing to the next item.
	Node* head;

};


int main()
{
	StackLinkedList stack;

	bool exit  = false;
	int PushPopOrPrint = 0;
	while (!exit)
	{
		cout << "Push (1) or Pop (2) or PrintFullStack(3) or Exit (4): ";
		
		cin >> PushPopOrPrint;
		cout << endl;

		if (PushPopOrPrint == 1)
		{
			cout << "Write something: ";
			string pushing;
			cin >> pushing;
			cout << endl;

			stack.Push(pushing);
		}
		else if(PushPopOrPrint == 2)
		{
			cout << stack.Pop();
		}
		else if (PushPopOrPrint == 3)
		{
			stack.PrintEntireStack();
		} 
		else if (PushPopOrPrint == 4)
		{
			exit = true;
		}
		else
		{
			PushPopOrPrint = 0;
		}

	}
	


	return 0;
}
