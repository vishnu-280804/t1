import java.util.*;
import java.lang.*;
public class palindromeString{
	public static void main(String [] args)
	{
		String s;
		Scanner sc = new Scanner(System.in);
		s = sc.nextLine();
		StringBuilder str = new StringBuilder(s);
		str.reverse();
		
		String s1 = str.toString();
		
		if(s1.equals(s))
		{
			System.out.println("Palindrome");
		}
		else{
			System.out.println("Not a Palindrome");
		}
	}
}
