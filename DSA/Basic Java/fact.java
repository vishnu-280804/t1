import java.util.*;
import java.lang.*;

public class fact
{
	public static void main(String [] args)
	{
		int N;
		Scanner sc = new Scanner(System.in);
		N = sc.nextInt();
		System.out.println(fact(N));
	}
	public static int fact(int N)
	{
		if(N==0 || N==1)
		{
			return 1;
		}
		else{
			int facts=1;
			for(int i=1;i<=N;i++)
			{
				facts*=i;
			}
			return facts;
		}
	}
}