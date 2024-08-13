import java.util.*;
import java.lang.*;

public class voting
{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int N;
		N = sc.nextInt();
		if(voting(N))
		{
			System.out.println("Eligible to Vote");
		}
		else{
			System.out.println("Not eligible to vote");
		}
	}
	public static boolean voting(int N)
	{
		if(N>=18)
		{
			return true;
		}
		else{
			return false;
		}
	}
}