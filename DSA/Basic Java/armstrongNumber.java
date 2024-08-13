import java.util.*;
import java.lang.*;
public class armstrongNumber{
	public static void main(String [] args)
	{
		int n;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the armstrong Number");
		n = sc.nextInt();
		int org = n;
		int count=0;
		double sum=0.0;
		int d = n;
		
		while(d>0)
		{
			int digit = d%10;
			count++;
			d= d/10;
		}
		while(n>0)
		{
			int digit = n%10;
			 sum = sum+Math.pow(digit,count);
			 n = n/10;
		}
		if(org==sum)
		{
			System.out.println("Armstrong Number");
		}
		else{
			System.out.println("Not an Armstrong Number");
		}
	}
}