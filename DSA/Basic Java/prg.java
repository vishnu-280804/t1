import java.util.*;
import java.lang.*;

class integer{
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int N = sc.nextInt();
		int max=N;
		while(N!=0)
		{
			N = sc.nextInt();
			if(N>max)
			{
				max = N;
			}
		}
		System.out.println(max);
	}
}