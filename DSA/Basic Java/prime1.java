import java.util.*;
import java.lang.*;

public class prime1
{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int M = sc.nextInt();
		int N = sc.nextInt();
		for(int i=M+1;i<N;i++)
		{
			if(prime1(i))
			{
				System.out.print(i+" ");
			}
		}
	}
	
	public static boolean prime1(int N)
	{
		int i;
		int count=0;
		for(i=2;i<=N/2;i++)
		{
			if(N%i==0)
			{
				count+=1;
				break;
			}
		}
		if(count==0)
		{
			return true;
		}
		else{
			return false;
		}
	}
	
}
