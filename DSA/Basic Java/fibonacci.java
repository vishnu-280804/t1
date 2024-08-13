import java.util.*;
import java.lang.*;
public class fibonacci{
	public static void main(String [] args)
	{
		int a = 0,b=1,c;
		int n;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the number of series");
		n = sc.nextInt();
		System.out.print(a+""+b);
		while(n>0)
		{
			c = a+b;
			
			System.out.print(c);
			a=b;
			b=c;
			n=n-1;
		}
		
	}
}