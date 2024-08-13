import java.util.*;
import java.lang.*;

public class natural
{
	public static void main(String [] args)
	{
		int N;
		Scanner sc = new Scanner(System.in);
		N = sc.nextInt();
		System.out.println(sum(N));
	}
	public static int sum(int N)
	{
		return (N*(N+1))/2;
	}
}

		