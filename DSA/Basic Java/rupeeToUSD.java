import java.util.*;
import java.lang.*;
public class rupeeToUSD
{
	public static void main(String [] args)
	{
		int rupee;
		Scanner sc = new Scanner(System.in);
		rupee = sc.nextInt();
		double dollar;
		dollar = 0.012*rupee;
		System.out.println("The USD Dollar is "+dollar+" USD");
	}
}