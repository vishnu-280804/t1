import java.util.*;
import java.lang.*;

public class prime
{
	public static void main(String [] args)
	{
		int N;
		Scanner sc = new Scanner(System.in);
		N = sc.nextInt();
		System.out.println(prime(N));
	}
	public static boolean prime(int N)
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