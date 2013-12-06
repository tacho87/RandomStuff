#include <iostream>
#include <string>
using namespace std;

template <class T>
class Node 
{
public:
	T value;
	Node *Next;
	
};

template<class T>
class QueueLinkedList
{

public:
	QueueLinkedList()
	{
		head = NULL;
		tail = NULL;
	}
	~QueueLinkedList()
	{
		Node<T>* temp;
		
		while (head != NULL)
		{
			temp = head;
			head = head->Next;
			delete temp;			
		}
	}

	void Queue (T item)
	{
		Node<T>* oldTail = tail;
		tail = new Node<T>();
		tail->value = item;
		tail->Next = NULL;

		if (head == NULL)
			head = tail;
		else
			oldTail->Next = tail;
		

	}
	T Dequeue()
	{
		if (head != NULL){
			T value = head->value;
			Node<T>* temp = head;
			head = head->Next;
			delete temp;

			if (head == NULL) tail = NULL;

			return value;
		}
	}
	void PrintQueue()
	{
		Node<T>* temp = head;
		
		while (temp != NULL)
		{
			cout << temp->value << endl;
			temp = temp->Next;
		}
	}


private:

	
	Node<T> *head, *tail;

};


int main()
{
	QueueLinkedList<int> queue;

	//queue.Queue("first added");
	//queue.Queue("second added");
	//queue.Queue("third added");


	queue.Queue(1);
	queue.Queue(2);
	queue.Queue(3);
	queue.Queue(4);

	queue.PrintQueue();

	queue.Dequeue();
	queue.Dequeue();

	queue.PrintQueue();


	


	return 0;
}