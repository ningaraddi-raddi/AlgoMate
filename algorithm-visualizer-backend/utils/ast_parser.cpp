#include <clang/AST/AST.h>
#include <clang/AST/RecursiveASTVisitor.h>
#include <clang/Frontend/CompilerInstance.h>
#include <clang/Frontend/FrontendAction.h>
#include <clang/Tooling/Tooling.h>
#include <clang/Tooling/CommonOptionsParser.h>
#include <llvm/Support/CommandLine.h>
#include <iostream>
#include <string>
#include <vector>

using namespace clang;
using namespace clang::tooling;

class FunctionVisitor : public RecursiveASTVisitor<FunctionVisitor> {
public:
    explicit FunctionVisitor(ASTContext *Context) : Context(Context) {}

    bool VisitFunctionDecl(FunctionDecl *FD) {
        if (FD->isThisDeclarationADefinition()) {
            std::cout << "FUNC_NAME " << FD->getNameAsString() << "\n";
            std::cout << "RET_TYPE " << FD->getReturnType().getAsString() << "\n";
            
            std::cout << "ARGS ";
            for (unsigned i = 0; i < FD->getNumParams(); ++i) {
                auto P = FD->getParamDecl(i);
                std::cout << P->getNameAsString() << ":" << P->getType().getAsString() << " ";
            }
            std::cout << "\n";
        }
        return true;
    }

private:
    ASTContext *Context;
};

class FunctionASTConsumer : public ASTConsumer {
public:
    explicit FunctionASTConsumer(ASTContext *Context) : Visitor(Context) {}
    void HandleTranslationUnit(ASTContext &Context) override {
        Visitor.TraverseDecl(Context.getTranslationUnitDecl());
    }
private:
    FunctionVisitor Visitor;
};

class FunctionFrontendAction : public ASTFrontendAction {
public:
    std::unique_ptr<ASTConsumer> CreateASTConsumer(CompilerInstance &CI, StringRef file) override {
        return std::make_unique<FunctionASTConsumer>(&CI.getASTContext());
    }
};
