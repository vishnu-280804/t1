import java.util.*;
import java.lang.*;

public class maxmin{
	public static void main(String [] args)
	{
		int A,B,C;
		Scanner sc = new Scanner(System.in);
		A = sc.nextInt();
		B = sc.nextInt();
		C = sc.nextInt();
		System.out.println("The maximum of the three numbers");
		System.out.println(max(A,B,C));
		System.out.println("The minimum of the three numbers");
		System.out.println(min(A,B,C));
	}
	public static int max(int A,int B,int C)
	{
		if(A>B && A>C)
		{
			return A;
		}
		else if(B>C && B>A)
		{
			return B;
		}
		else{
			return C;
		}
	}
	public static int min(int A,int B,int C)
	{
		if(A<B && A<C)
		{
			return A;
		}
		else if(B<C && B<A)
		{
			return B;
		}
		else{
			return C;
		}
	}
}