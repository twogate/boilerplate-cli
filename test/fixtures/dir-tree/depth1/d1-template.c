#include <stdio.h>
#include <stdlib.h>

char *prog;
int ary[30000];
int *ptr = ary;
int idx;

int stack[100];
int stack_flag[100];
int stack_idx = 0;

void
init()
{
    int i;
    for (i=0;i<100;i++) {
        stack[i] = 0;
        stack_flag[i] = 0;
    }
}

void
push(int val,int flag)
{
    if (stack_idx < 100) {
        stack[stack_idx++] = val;
        stack_flag[stack_idx] = flag;
    }
    else {
        fprintf(stderr,"stack overflow");
        exit(EXIT_FAILURE);
    }
}

int
pop()
{
    if (stack_idx > 0) {
        int tmp = stack[--stack_idx];
        return tmp;
    }
    else {
        fprintf(stderr,"stack underflow");
        exit(EXIT_FAILURE);
    }
}

int
check()
{
    int i;
    return stack_flag[stack_idx];
}

int
read()
{
    if (prog[idx] == '\0')
        return EOF;
    return prog[idx];
}

int
interpret(int startidx)
{
    //printf("SI: %d\n",startidx);
    int ch = read();
    //printf("%d\n",check());
    switch (ch) {
        case '>':
            idx++;
            if (check()) break;
            ptr++;
            break;
        case '<':
            idx++;
            if (check()) break;
            ptr--;
            break;
        case '+':
            idx++;
            if (check()) break;
            (*ptr)++;
            break;
        case '-':
            idx++;
            if (check()) break;
            (*ptr)--;
            break;
        case '.':
            idx++;
            if (check()) break;
            putchar(*ptr);
            fflush(stdout);
            break;
        case ',':
            idx++;
            if (check()) break;
            *ptr = getchar();
            break;
        case '[':
            if (*ptr == 0) {
                push(idx,1);
                idx++;
            }
            else {
                push(idx,0);
                idx++;
            }
            break;
        case ']':
            if (check() != 1) {
                idx = pop();
            }
            else {
                pop();
                idx++;
            }
            break;
        case EOF:
            return 0;
        default:
            idx++;
            break;
            //exit(0);
    }
    return 1;
}

int
main(int argc, char *argv[])
{

    init();

    FILE *fp;
    if (argc != 2)
        exit(EXIT_FAILURE);
    if ((fp = fopen(argv[1],"r")) == NULL) {
        fprintf(stdout,"file\n");
        exit(EXIT_FAILURE);
    }

    fseek(fp, 0L, SEEK_END);
    int sz = ftell(fp);
    fseek(fp, 0L, SEEK_SET);

    if (NULL == (prog = (char *)malloc(sz))) {
        fprintf(stdout,"malloc\n");
        exit(EXIT_FAILURE);
    }

    char dbg;
    while((*prog = fgetc(fp)) != EOF) {
        *prog++;
    }
    *prog = '\0';
    fclose(fp);

    prog = prog - sz;

    int i;
    for (i=0; i<30000; i++)
        ary[i] = 0;

    fflush(stdin);

    idx = 0;
    while(interpret(0)) {

    }
}
