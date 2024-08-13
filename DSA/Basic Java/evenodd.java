import java.util.*;
import java.lang.*;

public class evenodd{
	public static void main(String [] args)
	{
		int A;
		Scanner sc = new Scanner(System.in);
		A = sc.nextInt();
		System.out.println(evenorodd(A));
	}
	public static boolean evenorodd(int A)
	{
		if(A%2==0)
		{
			return true;
		}
		else{
			return false;
		}
	}
		
}