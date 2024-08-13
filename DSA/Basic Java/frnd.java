import java.util.*;
import java.lang.*;


public class frnd{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int N = 31;
		int count=0;
		System.out.println("The number of days in the August is "+N);
		
		for(int i=2;i<=N;i+=2)
		{
			count++;
		}
		System.out.println(count);
	}
	
}
			