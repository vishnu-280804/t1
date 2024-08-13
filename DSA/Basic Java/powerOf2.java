import java.util.*;
import java.lang.*;
public class powerOf2{
	public static void main(String [] args)
	{
		String s;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the string");
		s = sc.nextLine();
		StringBuilder str = new StringBuilder(s);
		
		for(int i=0;i<s.length();i++)
		{
			if(s.charAt(i)=='a' || s.charAt(i)=='e' || s.charAt(i)=='o' || s.charAt(i)=='u')
			{
				str.deleteCharAt(i);
			}
			
		}
		System.out.println(str.toString());
	}
}