import java.util.*;
import java.lang.*;

public class sum{
	public static void main(String [] args)
	{
		
		Scanner sc = new Scanner(System.in);
		int N;
		N = sc.nextInt();
		int org = N;
		int count1=0,count2=0,count3=0;
		while(N!=0)
		{
			
			if(N<0)
			{
				count1+=N;
			}
			if(N>0 && N%2==0)
			{
				count2+=N;
			}
			else if(N>0 && N%2!=0){
				count3+=N;
			}
			N = sc.nextInt();
			
			
			
			
			
			
			
		}
		System.out.println(count1+" "+count2+" "+count3);
	}
}
			