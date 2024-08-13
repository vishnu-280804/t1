import java.lang.*;
import java.util.*;

public class power{
	public static void main(String [] args)
	{
		
		Scanner sc=new Scanner(System.in);
		int n;
		n = sc.nextInt();
		System.out.println(power(n));
	}
	public static boolean power(int n)
	{
		boolean result = true;
		while(n>1)
		{
			if(n%2==0)
			{
				n = n/2;
			}
			else{
				result = false;
				break;
			}
		}
		return result;
		
	}
}