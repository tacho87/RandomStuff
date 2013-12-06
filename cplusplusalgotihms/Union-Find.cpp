/*
#include <iostream>

class QuickUnionFind
{
	
public:
	QuickUnionFind(int ArraySize);
	~QuickUnionFind();

	bool Connected(int p, int q);
    void Union (int p, int q);
	void PrintMapToConsole();
private:
	int* ID;
	int Size;
};




int main()
{
	QuickUnionFind UF(21);

	


	UF.Union(2, 5);
	UF.Union (10, 1);
	UF.Union(1, 20);
	UF.Union(8, 18);

	UF.PrintMapToConsole();


	return 0;
}

void QuickUnionFind::PrintMapToConsole()
{
	for (int i = 0; i < Size; i++)
	{
		std::cout << std::endl;
		std::cout << ID[i];
	}
	std::cout << "\n\n";

	for (int i = 0; i < Size; i++)
	{
		for (int x = 0; x < Size; x++)
		{
			if (i != x)
			{
				if (ID[i] == ID[x])
				{
					std::cout << x << ":" << ID[x] << " - ";
				}
			}
			
		}
		std::cout << std::endl;
	}


}

bool QuickUnionFind::Connected(int p, int q)
{
	return ID[p] == ID[q];
}
void QuickUnionFind::Union(int p, int q)
{
	int pId = ID[p];
	int qId = ID[q];

	for (int i = 0; i < Size; i++)
	{
		if (ID[i] == pId) 
		{
			ID[i] = qId;

		}
	}
}


QuickUnionFind::QuickUnionFind(int ArraySize)
{
	ID = new int[ArraySize];
	Size = ArraySize;

	for ( int i = 0; i < ArraySize; i++)
	{
		ID[i] = i;
	}

	for (int i = 0; i < Size; i++)
	{
		std::cout << std::endl;
		std::cout << ID[i];
	}

}
QuickUnionFind::~QuickUnionFind()
{
	delete[] ID;
}
*/