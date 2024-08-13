import java.util.*;
import java.lang.*;
public class operatorsIf
{
	public static void main(String [] args)
	{
		int a,b;
		String s;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter two numbers and operator");
		a = sc.nextInt();
		b = sc.nextInt();
		sc.nextLine();
		System.out.println("Enter the operator");
		s = sc.next();
		if(s.equals("+"))
		{
			System.out.println("Addition of two numbers is"+(a+b));
		}
		else if(s.equals("-"))
		{
			System.out.println("Subtraction of two numbers is "+(a-b));
		}
		else if(s.equals("*"))
		{
			System.out.println("Multiplication of two numbers is "+(a*b));
		}
		else{
			System.out.println("Division of two numbers is "+(a/b));
		}
	}
}