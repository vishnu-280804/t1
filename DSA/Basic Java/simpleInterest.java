import java.util.*;
import java.lang.*;
public class simpleInterest
{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int P,T,R;
		System.out.println("Enter P,T,R values:\n");
		P = sc.nextInt();
		T = sc.nextInt();
		R = sc.nextInt();
		
		double sI = (P*T*R)/100;
		
		System.out.println("The Simple Interest is "+sI);
	}
}
		
		