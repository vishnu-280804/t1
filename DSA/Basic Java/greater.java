import java.util.*;
import java.lang.*;
public class greater{
	public static void main(String [] args)
	{
		int a,b;
		Scanner sc = new Scanner(System.in);
		a = sc.nextInt();
		b = sc.nextInt();
		if(a>b)
		{
			System.out.println("A is greater than B");
		}
		else{
			System.out.println("B is greater than A");
		}
	}
}