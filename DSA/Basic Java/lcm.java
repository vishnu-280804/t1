import java.util.*;
import java.lang.*;
public class lcm{
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter M and N");
		int i,j;
		int M = sc.nextInt();
		int N = sc.nextInt();
		
		int result;
		System.out.println((M*N)/hcf(M,N));
		
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