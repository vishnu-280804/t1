import java.util.*;
import java.lang.*;

public class sum1{
	public static void main(String [] args)
	{
		int a,b;
		Scanner sc = new Scanner(System.in);
		a = sc.nextInt();
		b = sc.nextInt();
		System.out.println(sum(a,b));
	}
	public static int sum(int a,int b)
	{
		return a+b;
	}
}