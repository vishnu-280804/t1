import java.util.*;
import java.lang.String.*;

public class removeVowels
{
	public static void main(String [] args)
	{
		String s;
		Scanner sc=new Scanner(System.in);
		s = sc.nextLine();
		StringBuilder str = new StringBuilder(s);
		
		int n = str.length();
		for(int i=0;i<n;i++)
		{
			char  a = str.charAt(i);
			if(a=='a'||a=='e'||a=='i'||a=='o'||a=='u'){
				str.deleteCharAt(i);
			}
		}
		System.out.println(str.toString());
}

}