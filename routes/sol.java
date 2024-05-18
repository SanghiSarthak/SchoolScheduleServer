package routes;

import java.util.Scanner;

public class sol{
    
    public static void main(String[] args) {
        // Sample Testcase 1\

        
        Scanner inpt = new Scanner(System.in);

        int n = inpt.nextInt();
        String k = inpt.next();
        int leftCount = 0;
        int rightCount = 0;
           for (int i = 0; i < n; i++) {
            if (k.charAt(i) == 'L') {
                leftCount++;
            } else {
                rightCount++;
            }
        }
        
        int minChanges = Math.min(leftCount, rightCount);
        int bestQueenPosition = 1;
        

        for (int i = 1; i < n; i++) {
            if (k.charAt(i - 1) == 'L') {
                leftCount--;
            } else {
                rightCount--;
            }
            
            if (k.charAt(i) == 'R') {
                rightCount++;
            } else {
                leftCount++;
            }
            
            int changes = Math.min(leftCount, rightCount);
            if (changes < minChanges) {
                minChanges = changes;
                bestQueenPosition = i + 1;
            }
        }
       
        System.out.println(bestQueenPosition + " " + minChanges);
    }

}
