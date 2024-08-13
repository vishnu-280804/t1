import java.util.*;
import java.lang.*;

public class palindromeNumber{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int n;
		System.out.println("Enter the number");
		n = sc.nextInt();
		int org = n;
		int rev=0;
		while(n>0)
		{
			int digit = n%10;
			rev = rev*10+digit;
			n = n/10;
		}
		if(org == rev)
		{
			System.out.println("Palindrome Number");
		}
		else{
			System.out.println("Not a palindrome number");
		}
	}
}