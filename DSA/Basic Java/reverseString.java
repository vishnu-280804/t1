import java.util.*;
import java.lang.*;

class reverseString{
	public static void main(String [] args)
	{
		String s;
		Scanner sc = new Scanner(System.in);
		s = sc.nextLine();
		StringBuilder str = new StringBuilder(s);
		str.reverse();
		
		System.out.println(str.toString());
	}
}