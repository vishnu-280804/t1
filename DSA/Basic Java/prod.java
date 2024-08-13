import java.util.*;
import java.lang.*;

public class prod{
	public static void main(String [] args)
	{
		int a,b;
		Scanner sc = new Scanner(System.in);
		a = sc.nextInt();
		b = sc.nextInt();
		System.out.println(prod(a,b));
		
	}
	public static int prod(int a,int b)
	{
		return a*b;
	}
}
