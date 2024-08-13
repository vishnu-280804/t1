import java.util.*;
import java.lang.*;

class hcf{
	public static void main(String [] args)
	{
		int N;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the number:");
		int M = sc.nextInt();
		N = sc.nextInt();
		int result = 0;
		
		System.out.println(hcf(M,N);
	}
	public static int hcf(int M,int N)
	{
		if(M%N==0)
		{
			return N;
		}
		else if(N%M==0){
				return M;
		}
		else{
			return hcf(N,M%N);
		}
	}
}