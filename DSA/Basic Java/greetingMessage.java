import java.util.*;
import java.lang.*;
public class greetingMessage
{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		String s;
		System.out.print("Enter the name of the person to be wished");
		s = sc.nextLine();
		System.out.println("Thanks! "+s+" for the help");
	}
}