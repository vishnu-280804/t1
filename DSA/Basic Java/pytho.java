import java.util.*;
import java.lang.*;

public class pytho
{
	public static void main(String [] args)
	{
		int a,b,c;
		Scanner sc = new Scanner(System.in);
		a = sc.nextInt();
		b = sc.nextInt();
		c = sc.nextInt();
		System.out.println(pytho(a,b,c));
	}
	public static boolean pytho(int a,int b,int c)
	{
		int a1 = (int)Math.pow(a,2);
		int b1 = (int)Math.pow(b,2);
		int c1 = (int)Math.pow(c,2);
		
		if((a1+b1)==c1)
		{
			return true;
		}
		else{
			return false;
		}
	}
}
		