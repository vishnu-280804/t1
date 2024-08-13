import java.util.*;
import java.lang.*;

class vowel{
	public static void main(String [] args)
	{
		int N;
		Scanner sc = new Scanner(System.in);
		N = sc.nextInt();
		int org = N;
		int sum=0;
		for(int i=1;i<N;i++)
		{
			if(N%i==0)
			{
				sum+=i;
			}
		}
		if(org == sum)
		{
			System.out.println("Perfect number");
		}
		else{
			System.out.println("Not a perfect number");
		}
	}
}